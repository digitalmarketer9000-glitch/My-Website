import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Serve attachments directory
  app.use('/attachments', express.static(path.join(process.cwd(), 'attachments')));

  // API routes FIRST
  app.post("/api/contact", async (req, res) => {
    const { name, email, service, message } = req.body;

    if (!name || !email || !service || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      if (!resend) {
        console.error("RESEND_API_KEY is missing. Please add it to your environment variables.");
        return res.status(500).json({ 
          error: "Email service is not configured. Please add RESEND_API_KEY to your Secrets/Settings." 
        });
      }

      const targetEmail = process.env.CONTACT_EMAIL || "digitalmarketer9000@gmail.com";
      
      await resend.emails.send({
        from: "DataScale <notifications@webanalytics.click>",
        to: targetEmail,
        subject: `New Contact Form Submission: ${service}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      });
      
      console.log(`Email sent successfully via Resend to ${targetEmail}`);
      res.json({ success: true, message: `Message sent successfully to ${targetEmail}!` });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send message. Check your API key and 'from' address." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
    if (process.env.RESEND_API_KEY) {
      console.log("✅ Resend API Key detected and loaded.");
    } else {
      console.warn("⚠️ Resend API Key NOT detected. Please add it to Secrets.");
    }
  });
}

startServer();
