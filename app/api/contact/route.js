import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ message: "Tüm alanlar zorunludur." }),
        {
          status: 400,
        }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.CONTACT_EMAIL_USER,
        pass: process.env.CONTACT_EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${process.env.CONTACT_EMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL_RECEIVER,
      replyTo: email,
      subject: "İletişim Formu Mesajı",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Yeni Bir Mesajınız Var</h2>
          <p><strong>Gönderen:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Mesaj:</strong></p>
          <blockquote style="border-left: 4px solid #ccc; padding-left: 1em;">
            ${message.replace(/\n/g, "<br />")}
          </blockquote>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: "Mesaj gönderildi." }), {
      status: 200,
    });
  } catch (error) {
    console.error("Email gönderim hatası:", error);
    return new Response(JSON.stringify({ message: "Mesaj gönderilemedi." }), {
      status: 500,
    });
  }
}
