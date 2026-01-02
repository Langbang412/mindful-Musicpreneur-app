import { Resend } from 'resend'
import { prisma } from './prisma'

if (!process.env.RESEND_API_KEY) {
  console.warn('RESEND_API_KEY is not defined, emails will not be sent')
}

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

const FROM_EMAIL = 'The Mindful Musicpreneur <hello@themindfulmusicpreneur.com>'
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

interface EmailOptions {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  if (!resend) {
    console.log('Email would be sent to:', to)
    console.log('Subject:', subject)
    console.log('HTML:', html)
    return { success: true, messageId: 'test' }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    })

    if (error) {
      console.error('Email sending error:', error)
      return { success: false, error }
    }

    return { success: true, messageId: data?.id }
  } catch (error) {
    console.error('Email sending exception:', error)
    return { success: false, error }
  }
}

// Email Templates

export async function sendGuidePurchaseEmail({
  email,
  firstName,
  userId,
}: {
  email: string
  firstName: string
  userId: string
}) {
  const downloadUrl = `${APP_URL}/dashboard/downloads`
  const collectiveUrl = `${APP_URL}/collective/apply`
  const substackUrl = 'https://themindfulmusicpreneur.substack.com'

  const html = `
    <h1>You're in. (And your nervous system says thank you.)</h1>
    
    <p>High five, Musicpreneur. You just took a massive step toward a career that actually feels as good as it looks.</p>
    
    <p>Your copy of The Mindful Musicpreneur Guide (and your bonus Mindful Muse Quarterly Planner) are ready for you.</p>
    
    <p><a href="${downloadUrl}" style="display: inline-block; background: #bc13fe; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Download Your Guide + Planner</a></p>
    
    <p>This isn't just a PDF; it's the emotional infrastructure for your artistry. Take your time with the "Woo of You" section—it's a game-changer for how you pick your collaborators.</p>
    
    <h3>The Next Right Move:</h3>
    <p>Most of the magic happens when we do this work together. If you're ready for the "Green Room" vibe, <a href="${collectiveUrl}">apply for The Collective here</a>.</p>
    
    <p>See you backstage,<br>Jen</p>
    
    <p><strong>P.S.</strong> Join the conversation on <a href="${substackUrl}">Substack</a> for more "Personal Power Happy Hour™" vibes.</p>
    
    <p style="font-size: 12px; color: #666; margin-top: 40px;">Secure checkout via Stripe. We never see or store your full payment details.</p>
  `

  return sendEmail({
    to: email,
    subject: "You're in. (And your nervous system says thank you.)",
    html,
  })
}

export async function sendPlannerPurchaseEmail({
  email,
  firstName,
  userId,
}: {
  email: string
  firstName: string
  userId: string
}) {
  const downloadUrl = `${APP_URL}/dashboard/downloads`
  const collectiveUrl = `${APP_URL}/collective/apply`

  const html = `
    <h1>Your schedule is about to get a lot more soulful.</h1>
    
    <p>You've got the Mindful Muse Quarterly Planner. Your future self is already breathing a sigh of relief.</p>
    
    <p><a href="${downloadUrl}" style="display: inline-block; background: #bc13fe; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Download Your Planner</a></p>
    
    <p>Use this to track your wins, your boundaries, and your big-picture moves—not just your gig dates.</p>
    
    <h3>Want the full system?</h3>
    <p>If you find yourself wanting the deep-dive strategy and shadow work that goes with this, you can upgrade to the full Mindful Musicpreneur Guide anytime.</p>
    
    <p>And if you're looking for your people, <a href="${collectiveUrl}">apply to join us in The Collective</a>.</p>
    
    <p>Stay grounded,<br>Jen</p>
  `

  return sendEmail({
    to: email,
    subject: 'Your schedule is about to get a lot more soulful.',
    html,
  })
}

export async function sendBogoBuyerEmail({
  email,
  firstName,
  recipientFirstName,
  userId,
}: {
  email: string
  firstName: string
  recipientFirstName: string
  userId: string
}) {
  const downloadUrl = `${APP_URL}/dashboard/downloads`
  const collectiveUrl = `${APP_URL}/collective/apply`

  const html = `
    <h1>Double the magic. (Your BOGO details inside)</h1>
    
    <p>You're a legend. Not only did you invest in yourself, but you're pulling another artist up with you. That's the energy this industry needs.</p>
    
    <h3>Your Access:</h3>
    <p><a href="${downloadUrl}" style="display: inline-block; background: #bc13fe; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Download Your Guide + Planner</a></p>
    
    <h3>Their Access:</h3>
    <p>We've already sent an email to ${recipientFirstName} with their download links and a note that it's a gift from you.</p>
    
    <h3>The Collective:</h3>
    <p>Both of you are eligible to <a href="${collectiveUrl}">apply for our private community</a>. Here is the link for you to get started.</p>
    
    <p>Cheers to being pro-artist,<br>Jen</p>
  `

  return sendEmail({
    to: email,
    subject: 'Double the magic. (Your BOGO details inside)',
    html,
  })
}

export async function sendBogoRecipientEmail({
  email,
  firstName,
  buyerFirstName,
  userId,
}: {
  email: string
  firstName: string
  buyerFirstName: string
  userId: string
}) {
  const downloadUrl = `${APP_URL}/dashboard/downloads`
  const collectiveUrl = `${APP_URL}/collective/apply`

  const html = `
    <h1>A gift for your career (from ${buyerFirstName})</h1>
    
    <p>Surprise! ${buyerFirstName} thinks you're a badass and wanted you to have a copy of The Mindful Musicpreneur Guide.</p>
    
    <p>This is a 360° system for female musicians to build careers that don't burn their brains to the ground. It's part strategy, part shadow work, and all heart.</p>
    
    <p>Grab your Guide + Bonus Planner here:</p>
    <p><a href="${downloadUrl}" style="display: inline-block; background: #bc13fe; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Download Your Gift</a></p>
    
    <p>You're also invited to <a href="${collectiveUrl}">apply for our private community, The Collective</a>, where we do this work together.</p>
    
    <p>Welcome to the world of Mindful Musicpreneurship.</p>
    
    <p>Best,<br>Jen</p>
  `

  return sendEmail({
    to: email,
    subject: `A gift for your career (from ${buyerFirstName})`,
    html,
  })
}

export async function sendCollectiveWelcomeEmail({
  email,
  firstName,
}: {
  email: string
  firstName: string
}) {
  const portalUrl = `${APP_URL}/collective/portal`

  const html = `
    <h1>Welcome to The Collective. (The door is open.)</h1>
    
    <p>You're in. We've reviewed your application and we're thrilled to have your energy in the room.</p>
    
    <h3>The Deets:</h3>
    <ul>
      <li><strong>Your Portal:</strong> <a href="${portalUrl}">Log in here</a> to find the Zoom link for our next Personal Power Happy Hour™</li>
      <li><strong>Substack:</strong> Your complimentary private Substack membership will be activated within 48 hours. Watch for an email from Substack.</li>
      <li><strong>The Vibe:</strong> This is a "no energy vampires" zone. We're here for real talk, radical responsibility, and supporting each other's wins.</li>
    </ul>
    
    <p>If you have a specific situation (a boundary issue, a creative block, or a "is this guy gaslighting me?" moment) you want to unpack in our next session, hit reply and let me know.</p>
    
    <p>See you in the Green Room,<br>Jen</p>
  `

  return sendEmail({
    to: email,
    subject: 'Welcome to The Collective. (The door is open.)',
    html,
  })
}

export async function sendCollectiveDeniedEmail({
  email,
  firstName,
  message,
}: {
  email: string
  firstName: string
  message?: string
}) {
  const defaultMessage = `Thank you so much for sharing your story and your heart in your application for The Collective.

    Right now, I'm keeping this specific cohort focused on artists who are currently at a very specific stage of their recording/touring journey to ensure the strategy sessions hit home for everyone in the room.
    
    Based on where you are right now, I don't think this is the perfect fit for you yet—and I respect your time and investment too much to let you join a room that isn't exactly what you need today.
    
    This isn't a "no," it's a "not right now."`

  const html = `
    <h1>Regarding your Collective Application</h1>
    
    <p>${message || defaultMessage}</p>
    
    <p>Please keep doing the work in the Guide and the Planner. I'm actually looking into opening a "Rising Artist" track in the future, and I'd love to keep you on the list for that.</p>
    
    <p>In the meantime, I'll see you over on the Substack!</p>
    
    <p>With respect,<br>Jen</p>
  `

  return sendEmail({
    to: email,
    subject: 'Regarding your Collective Application',
    html,
  })
}

export async function sendFreebieEmail({
  email,
  firstName,
}: {
  email: string
  firstName: string
}) {
  const downloadUrl = `${APP_URL}/freebie/download?email=${encodeURIComponent(email)}`

  const html = `
    <h1>Your Freebie is Ready!</h1>
    
    <p>Hi ${firstName},</p>
    
    <p>Thanks for joining The Mindful Musicpreneur community! Your free resource is ready for download.</p>
    
    <p><a href="${downloadUrl}" style="display: inline-block; background: #bc13fe; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Download Now</a></p>
    
    <p>Want to dive deeper? Check out The Mindful Musicpreneur Guide—the complete 360° system for female musicians.</p>
    
    <p>See you backstage,<br>Jen</p>
  `

  return sendEmail({
    to: email,
    subject: 'Your Freebie is Ready!',
    html,
  })
}
