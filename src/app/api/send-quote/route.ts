import { type NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { Client, UnitSystem } from '@googlemaps/google-maps-services-js'
import { pricing } from '@/lib/config'

const resend = new Resend(process.env.RESEND_API_KEY)
const googleMapsClient = new Client({})

const quoteSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  stepHeight: z.number().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsedData = quoteSchema.safeParse(body)

    if (!parsedData.success) {
      return NextResponse.json(parsedData.error, { status: 400 })
    }

    const { name, email, phone, address, stepHeight } = parsedData.data

    let quoteDetails = "The user did not provide a step height. A manual quote is required."
    let subject = `New Quote Request from ${name} - Same Day Ramps`
    
    if (stepHeight) {
      // 1. Calculate Ramp Length
      const rampLength = stepHeight * pricing.RAMP_LENGTH_PER_INCH_OF_RISE;

      // 2. Calculate Travel Fee using Google Maps API
      let travelFee = 0;
      let distanceInMiles = 0;
      try {
        const distanceResponse = await googleMapsClient.distancematrix({
          params: {
            origins: [pricing.BASE_ADDRESS],
            destinations: [address],
            key: process.env.GOOGLE_MAPS_API_KEY || '',
            units: UnitSystem.imperial, // gets distance in miles
          },
        });

        if (distanceResponse.data.rows[0].elements[0].status === 'OK') {
          const distanceInMeters = distanceResponse.data.rows[0].elements[0].distance.value;
          distanceInMiles = distanceInMeters / 1609.34; // Convert meters to miles
          // Calculate round-trip travel fee
          travelFee = (distanceInMiles * 2 * pricing.COST_PER_MILE) + pricing.FLAT_TRAVEL_FEE;
        }
      } catch (error) {
        console.error('Google Maps API Error:', error);
        // Fallback or error handling for travel fee
        distanceInMiles = 20; // Fallback to 20 miles
        travelFee = (distanceInMiles * 2 * pricing.COST_PER_MILE) + pricing.FLAT_TRAVEL_FEE;
      }
      
      // 3. Calculate Setup and Rental Fees
      const setupFee = rampLength * pricing.INSTALL_COST_PER_FOOT;
      const monthlyRental = rampLength * pricing.RENTAL_COST_PER_FOOT;
      
      quoteDetails = `
        <h3>Quote Estimate</h3>
        <p><em>This is an estimate based on the information provided.</em></p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;">Ramp Length:</td><td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">${rampLength.toFixed(0)} ft</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;">Monthly Rental Price:</td><td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">$${monthlyRental.toFixed(2)}/mo</td></tr>
        </table>
        <br>
        <h3>One-Time Fees</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;">One-Time Setup Fee:</td><td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">$${setupFee.toFixed(2)}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;">Travel Fee:</td><td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">$${travelFee.toFixed(2)}</td></tr>
        </table>
        <p style="font-size: 12px; color: #666;">Travel fee based on an estimated ${distanceInMiles.toFixed(1)} mile distance.</p>
        <hr>
        <p><strong>First Payment Total (Setup + Travel + 1st Month): $${(setupFee + travelFee + monthlyRental).toFixed(2)}</strong></p>
        <p><strong>Recurring Monthly Payment: $${monthlyRental.toFixed(2)}</strong></p>
      `;
      subject = `Your Instant Quote from Same Day Ramps`
    }
    
    // Email for the customer
    const customerEmailHtml = `
      <h1>${stepHeight ? 'Your Quote from Same Day Ramps' : 'We Have Received Your Request'}</h1>
      <p>Thank you for your interest! Below are the details of your request.</p>
      <hr>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Installation Address:</strong> ${address}</p>
      <hr>
      <h2>Quote Details</h2>
      <div>${quoteDetails}</div>
      <br>
      <p><em>We will be in touch shortly to confirm details and answer any questions.</em></p>
    `;

    // Detailed email for the business owner
    const ownerEmailHtml = `
      <h1>New Quote Request Received</h1>
      <h2>Customer Information:</h2>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Address:</strong> ${address}</li>
        ${stepHeight ? `<li><strong>Desired Step Height:</strong> ${stepHeight} inches</li>` : ''}
      </ul>
      <hr>
      <h2>Generated Quote Details:</h2>
      ${stepHeight ? `<div>${quoteDetails}</div>` : '<p>No step height provided. Manual quote needed.</p>'}
      <hr>
      <p><em>This is an automated notification. Please follow up with the client.</em></p>
    `;

    // Send email to business owner
    await resend.emails.send({
      from: 'quote@samedayramps.com',
      to: 'ty@samedayramps.com',
      subject: `New Quote Request: ${name}`,
      html: ownerEmailHtml,
    });

    // Send confirmation email to customer
    await resend.emails.send({
      from: 'quote@samedayramps.com',
      to: email,
      subject: subject,
      html: customerEmailHtml,
    });

    return NextResponse.json({ success: true, message: 'Quote request sent successfully.' }, { status: 200 })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ message: 'Error sending quote request' }, { status: 500 })
  }
} 