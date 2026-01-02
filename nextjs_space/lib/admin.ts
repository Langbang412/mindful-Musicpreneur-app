// Admin utilities
export function isAdmin(email?: string | null): boolean {
  if (!email) return false
  
  const adminEmails = [
    process.env.ADMIN_EMAIL,
    'admin@themindfulmusicpreneur.com',
  ].filter(Boolean)
  
  return adminEmails.includes(email.toLowerCase())
}
