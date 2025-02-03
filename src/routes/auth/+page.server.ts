///   / src/routes/(auth)/auth/+page.server.ts
//    import { fail, redirect } from '@sveltejs/kit';
//    import type { Actions, PageServerLoad } from './$types';
//    import bcrypt from 'bcrypt';
//    import { dev } from '$app/environment';
//    import { JWT_SECRET_KEY } from '$env/static/private';
//    import jwt from 'jsonwebtoken';
//    
//    // Import your database client (example using Prisma)
//    import { db } from '$lib/server/database';
//    
//    // Redirect if user is already logged in
//    export const load: PageServerLoad = async ({ locals }: { locals: { user?: any } }) => {
//      if (locals.user) {
//        throw redirect(302, '/dashboard');
//      }
//    };
//    
//    export const actions = {
//      login: async ({ request, cookies }) => {
//        const formData = await request.formData();
//        const email = formData.get('email');
//        const password = formData.get('password');
//    
//        if (
//          !email ||
//          !password ||
//          typeof email !== 'string' ||
//          typeof password !== 'string'
//        ) {
//          return fail(400, { invalid: true });
//        }
//    
//        try {
//          const user = await db.user.findUnique({
//            where: { email: email.toLowerCase() }
//          });
//    
//          if (!user) {
//            // Use a generic error message to prevent user enumeration
//            return fail(400, { credentials: true });
//          }
//    
//          const passwordMatch = await bcrypt.compare(password, user.passwordHash);
//    
//          if (!passwordMatch) {
//            return fail(400, { credentials: true });
//          }
//    
//          // Create a JWT token with minimal payload
//          const token = jwt.sign(
//            { 
//              userId: user.id,
//              email: user.email
//            },
//            JWT_SECRET,
//            { 
//              expiresIn: '7d',
//              algorithm: 'HS256' // Explicitly specify algorithm
//            }
//          );
//    
//          // Set secure HTTP-only cookie
//          cookies.set('session', token, {
//            path: '/',
//            httpOnly: true,
//            secure: !dev,
//            sameSite: 'strict',
//            maxAge: 60 * 60 * 24 * 7, // 7 days
//          });
//    
//          throw redirect(302, '/dashboard');
//        } catch (error) {
//          console.error('Login error:', error);
//          return fail(500, { error: true });
//        }
//      },
//    
//      register: async ({ request, cookies }) => {
//        const formData = await request.formData();
//        const email = formData.get('email');
//        const password = formData.get('password');
//        const username = formData.get('username');
//    
//        if (
//          !email ||
//          !password ||
//          !username ||
//          typeof email !== 'string' ||
//          typeof password !== 'string' ||
//          typeof username !== 'string'
//        ) {
//          return fail(400, { invalid: true });
//        }
//    
//        // Validate password strength
//        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/;
//        if (!passwordRegex.test(password)) {
//          return fail(400, { 
//            password: 'Password must be at least 8 characters and contain uppercase, lowercase, and numbers'
//          });
//        }
//    
//        try {
//          // Check if user already exists
//          const exists = await db.user.findFirst({
//            where: { 
//              OR: [
//                { email: email.toLowerCase() },
//                { username }
//              ]
//            }
//          });
//    
//          if (exists) {
//            return fail(400, { user: 'exists' });
//          }
//    
//          // Hash password with appropriate cost factor
//          const saltRounds = 12;
//          const passwordHash = await bcrypt.hash(password, saltRounds);
//    
//          // Create user with email verified false by default
//          const user = await db.user.create({
//            data: {
//              email: email.toLowerCase(),
//              username,
//              passwordHash,
//              emailVerified: false
//            }
//          });
//    
//          // Create JWT token
//          const token = jwt.sign(
//            { 
//              userId: user.id,
//              email: user.email
//            },
//            JWT_SECRET,
//            { 
//              expiresIn: '7d',
//              algorithm: 'HS256'
//            }
//          );
//    
//          // Set secure HTTP-only cookie
//          cookies.set('session', token, {
//            path: '/',
//            httpOnly: true,
//            secure: !dev, // Always secure in production
//            sameSite: 'strict',
//            maxAge: 60 * 60 * 24 * 7, // 7 days
//          });
//    
//          // Send verification email (implement this function)
//          await sendVerificationEmail(user.email, user.id);
//    
//          throw redirect(302, '/dashboard');
//        } catch (error) {
//          console.error('Registration error:', error);
//          return fail(500, { error: true });
//        }
//      },
//    
//      logout: async ({ cookies }) => {
//        cookies.delete('session', { path: '/' });
//        throw redirect(302, '/auth');
//      }
//    } satisfies Actions;
//    
//    // Example email verification function (implement with your email service)
//    async function sendVerificationEmail(_email: string, userId: string) {
//      // Implement email verification logic
//      // Example using a service like SendGrid or Nodemailer
//      try {
//        // Generate verification token
//        jwt.sign(
//          { userId },
//          JWT_SECRET,
//          { expiresIn: '24h' }
//        );
//    
//        // Send email with verification link
//        // await emailService.send({
//        //   to: email,
//        //   subject: 'Verify your email',
//        //   text: `Click here to verify your email: ${process.env.PUBLIC_URL}/verify?token=${verificationToken}`
//        // });
//      } catch (error) {
//        console.error('Error sending verification email:', error);
//        // Don't throw - we don't want to prevent registration if email fails
//      }
//    }
//    
//    // Add rate limiting (example implementation)
//    const loginAttempts = new Map<string, { count: number; firstAttempt: number }>();
//    
//    function checkRateLimit(_email: string): boolean {
//      const now = Date.now();
//      const attempt = loginAttempts.get(email);
//    
//      if (!attempt) {
//        loginAttempts.set(email, { count: 1, firstAttempt: now });
//        return true;
//      }
//    
//      // Reset if it's been more than 15 minutes
//      if (now - attempt.firstAttempt > 15 * 60 * 1000) {
//        loginAttempts.set(email, { count: 1, firstAttempt: now });
//        return true;
//      }
//    
//      // Allow up to 5 attempts in 15 minutes
//      if (attempt.count >= 5) {
//        return false;
//      }
//    
//      attempt.count++;
//      return true;
//    }
export const prerender: boolean = true;