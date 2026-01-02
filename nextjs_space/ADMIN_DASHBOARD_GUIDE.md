# Admin Dashboard Guide

## Overview

The Mindful Musicpreneur admin dashboard is a comprehensive management system that gives you complete control over your platform. This guide covers all admin features and how to use them effectively.

## Accessing the Admin Dashboard

1. Navigate to `/admin` on your deployed site
2. Log in with an admin account (configured in `lib/admin.ts`)
3. You'll see the main dashboard with key metrics and quick actions

**Note:** Only users with admin email addresses (configured in the code) can access the admin panel.

## Admin Dashboard Features

### 1. Main Dashboard (`/admin`)

The main dashboard provides an at-a-glance view of your platform:

- **Total Revenue**: Sum of all completed orders
- **Total Users**: Number of registered accounts
- **Collective Members**: Active members with portal access
- **Pending Applications**: Applications awaiting review
- **Email Subscribers**: Total active email subscribers

**Quick Actions:**
- Review Applications
- View Orders
- Manage Users
- Collective Members
- Manage Content
- Email List
- Analytics

---

### 2. Orders Management (`/admin/orders`)

View and manage all customer orders with powerful filtering options.

**Features:**
- View all orders with customer details
- Filter by:
  - Status (completed, pending, failed, refunded)
  - Product type
  - Date range
  - Search by order ID, email, or name
- Click any order to view full details including:
  - Order information
  - Customer details
  - BOGO recipient info (if applicable)
  - Order items and amounts

**Use Cases:**
- Track order fulfillment
- Investigate payment issues
- View customer purchase history
- Monitor BOGO gift deliveries

---

### 3. User Management (`/admin/users`)

Comprehensive user management with access control.

**Features:**
- View all registered users
- Filter by:
  - Users with purchases
  - Search by email or name
- Click any user to view:
  - User profile information
  - Purchase history
  - Collective applications
  - Download activity
- **Manage Access:**
  - Grant/revoke Guide access
  - Grant/revoke Planner access
  - Grant/revoke Collective membership

**Use Cases:**
- Manually grant product access (refunds, gifts, etc.)
- Troubleshoot user access issues
- Review user activity
- Manage Collective access

---

### 4. Collective Applications (`/admin/collective/applications`)

Review and manage applications to The Collective.

**Features:**
- View all applications with status filters:
  - Pending
  - Approved
  - Denied
- Click any application to view full details:
  - Applicant information
  - All application answers
  - Review and take action

**Actions:**
- **Approve Application:**
  - Add optional welcome message
  - Automatically sends welcome email
  - Grants portal access
  - Updates application status
  
- **Deny Application:**
  - Add optional custom message
  - Automatically sends denial email
  - Updates application status

**Use Cases:**
- Review new applications
- Approve qualified applicants
- Politely decline applications
- Track application history

---

### 5. Collective Members (`/admin/collective/members`)

Manage all active Collective members.

**Features:**
- View all members with:
  - Membership type (monthly/yearly)
  - Approval date
  - Download activity
- Revoke portal access when needed

**Use Cases:**
- Monitor active members
- Revoke access for cancelled subscriptions
- Track member engagement

---

### 6. Content Management (`/admin/content`)

Manage PDFs and portal content.

**PDF Management:**
Upload or replace product PDF files:
- **The Mindful Musicpreneur Guide**
- **The Mindful Muse Quarterly Planner**
- **Freebie PDF**

Simply select a file and upload - existing files will be replaced automatically.

**Portal Content Management:**
- **Zoom Meeting URL**: Link displayed on the portal
- **Welcome Message**: Text shown at the top of the portal
- **Substack URL**: Link to your private Substack

**Use Cases:**
- Update PDF versions
- Change Zoom meeting links
- Update portal messaging
- Modify Substack links

---

### 7. Email List Management (`/admin/emails`)

View and export email subscribers.

**Features:**
- View all subscribers with:
  - Email address
  - First name
  - Source (freebie, guide, planner, bogo, collective)
  - Status (subscribed/unsubscribed)
  - Subscribe date
- Filter by:
  - Source
  - Status
  - Search by email or name
- **Export to CSV**: Download complete subscriber list

**Statistics:**
- Total subscribers
- Active subscribers
- Unsubscribed count

**Use Cases:**
- Export emails for newsletter platforms
- Monitor subscriber growth
- Track unsubscribe rates
- Segment by source

---

### 8. Analytics (`/admin/analytics`)

Comprehensive analytics dashboard with visualizations.

**Key Metrics:**
- Total revenue (period-based)
- Total orders
- New users
- Collective members and approval rate

**Visualizations:**
- **Revenue Over Time**: Line chart showing daily revenue
- **Revenue by Product**: Pie chart showing product breakdown
- **Orders Over Time**: Bar chart showing order volume
- **Collective Statistics**: Overview of applications and approvals
- **Recent Orders**: Latest 10 completed orders

**Date Range Options:**
- Last 7 days
- Last 30 days
- Last 90 days
- Last year

**Use Cases:**
- Track business performance
- Identify best-selling products
- Monitor growth trends
- Analyze Collective engagement

---

## Navigation

### Desktop Navigation
On desktop devices, use the sidebar navigation on the left:
- Always visible
- Quick access to all admin sections
- Active page highlighted in purple

### Mobile Navigation
On mobile devices, use the bottom navigation bar:
- Fixed at bottom of screen
- Shows top 5 most used sections
- Tap icons to navigate

---

## Admin Workflows

### Approving a Collective Application

1. Go to **Collective Applications**
2. Filter by **Pending** status
3. Click on an application to review
4. Read all application answers
5. Click **Approve Application**
6. (Optional) Add a personal welcome message
7. Click **Approve & Send Email**
8. Applicant receives welcome email with portal access

### Manually Granting Product Access

1. Go to **User Management**
2. Search for the user by email
3. Click on the user to open details
4. Toggle the checkboxes for:
   - Guide access
   - Planner access
   - Collective membership
5. Changes save automatically

### Uploading New PDF Versions

1. Go to **Content Management**
2. Find the PDF section you want to update
3. Click **Choose File** and select the new PDF
4. Upload happens automatically
5. New file is immediately available to users

### Exporting Email List

1. Go to **Email List Management**
2. (Optional) Apply filters to narrow the list
3. Click **Export to CSV**
4. CSV file downloads with all subscriber data

### Viewing Order Details

1. Go to **Orders Management**
2. (Optional) Use filters to narrow results
3. Click the eye icon on any order
4. View complete order information including:
   - Customer details
   - Products purchased
   - Payment status
   - BOGO recipient (if applicable)

---

## Security & Permissions

### Admin Access
- Only users with admin email addresses can access the dashboard
- Admin emails are configured in `lib/admin.ts`
- To add admins, update the `adminEmails` array

### User Privacy
- User password data is never displayed
- All sensitive operations require authentication
- Download URLs are secure and tied to user entitlements

### Data Protection
- All admin API routes require authentication
- Role checking on every request
- Unauthorized access returns 401/403 errors

---

## Best Practices

### Regular Tasks
- **Daily**: Check pending applications
- **Weekly**: Review orders and user activity
- **Monthly**: Export email list for backups

### Content Management
- Test PDF uploads with small files first
- Keep PDFs under 50MB for best performance
- Update portal content before live sessions

### User Support
- Use User Management to troubleshoot access issues
- Check download activity to verify delivery
- Review order history for refund inquiries

### Analytics
- Review weekly trends to spot patterns
- Compare month-over-month growth
- Track Collective conversion rates

---

## Troubleshooting

### User Can't Access Content
1. Go to User Management
2. Search for user by email
3. Check product access toggles
4. Manually grant access if needed
5. User should refresh their dashboard

### Email Not Sending
- Check Resend API configuration
- Verify email templates are working
- Check user's email address is valid
- Review application logs

### Portal Content Not Updating
1. Go to Content Management
2. Update the content
3. Click **Save Portal Content**
4. Changes are immediate

### PDF Download Not Working
- Verify PDF file exists in `/public/pdfs/`
- Check file permissions
- Ensure user has product access
- Try re-uploading the PDF

---

## Technical Details

### Admin Layout
- Responsive design for all devices
- Sidebar navigation on desktop
- Bottom nav bar on mobile
- Purple accent color for active states

### Data Fetching
- All admin pages fetch data on load
- Real-time updates when actions are taken
- Loading states for better UX
- Error handling with toast notifications

### API Structure
- RESTful API design
- Authentication on all routes
- Proper HTTP status codes
- JSON responses

---

## Future Enhancements

Potential features for future phases:
- Bulk actions for users
- Advanced filtering and sorting
- Email campaign management
- Automated reports
- Role-based admin levels
- Activity logs and audit trail

---

## Support

For technical issues or questions:
1. Check this guide first
2. Review the README.md
3. Check application logs
4. Contact development team

---

*This dashboard was built to give you complete control over The Mindful Musicpreneur platform. Use these tools to deliver an exceptional experience to your community!*
