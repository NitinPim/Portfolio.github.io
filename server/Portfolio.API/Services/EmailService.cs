using System.Net;
using System.Net.Mail;

namespace Portfolio.API.Services;

public interface IEmailService
{
    Task<bool> SendContactNotificationAsync(string name, string email, string subject, string message);
}

public class EmailService : IEmailService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<EmailService> _logger;

    public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
    {
        _configuration = configuration;
        _logger = logger;
    }

    public async Task<bool> SendContactNotificationAsync(string name, string email, string subject, string message)
    {
        try
        {
            var host = _configuration["SmtpSettings:Host"] ?? "smtp.gmail.com";
            var port = int.Parse(_configuration["SmtpSettings:Port"] ?? "587");
            var senderEmail = _configuration["SmtpSettings:SenderEmail"] ?? "nitinpimpalkar17@gmail.com";
            var senderName = _configuration["SmtpSettings:SenderName"] ?? "Portfolio Notification";
            var password = _configuration["SmtpSettings:Password"]?.Replace(" ", "") ?? "";
            var recipientEmail = _configuration["SmtpSettings:RecipientEmail"] ?? senderEmail;
            var enableSsl = bool.Parse(_configuration["SmtpSettings:EnableSsl"] ?? "true");

            using var client = new SmtpClient(host, port)
            {
                Credentials = new NetworkCredential(senderEmail, password),
                EnableSsl = enableSsl,
                Timeout = 15000 // 15 seconds
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress(senderEmail, senderName),
                Subject = $"[Portfolio Inquiry] {subject} - From: {name}",
                IsBodyHtml = true
            };

            mailMessage.To.Add(recipientEmail);
            mailMessage.ReplyToList.Add(new MailAddress(email, name));

            // Beautiful HTML Template
            mailMessage.Body = $@"
<!DOCTYPE html>
<html>
<head>
    <meta charset=""utf-8"">
    <style>
        body {{ font-family: 'Segoe UI', Arial, sans-serif; background-color: #0b0f19; color: #f8fafc; margin: 0; padding: 20px; }}
        .card {{ max-width: 600px; margin: 0 auto; background: #13192b; border-radius: 12px; border: 1px solid #2d3748; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }}
        .header {{ background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 24px; text-align: center; color: #ffffff; }}
        .header h2 {{ margin: 0; font-size: 22px; }}
        .content {{ padding: 28px; }}
        .field {{ margin-bottom: 18px; }}
        .label {{ font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin-bottom: 4px; font-weight: bold; }}
        .value {{ font-size: 15px; color: #e2e8f0; background: #0c101c; padding: 10px 14px; border-radius: 6px; border: 1px solid #1e293b; }}
        .message-box {{ min-height: 80px; white-space: pre-wrap; }}
        .footer {{ padding: 18px; background: #090d16; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #1e293b; }}
        .btn {{ display: inline-block; background: #6366f1; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-weight: bold; margin-top: 10px; }}
    </style>
</head>
<body>
    <div class=""card"">
        <div class=""header"">
            <h2>New Inquiry on Your Portfolio</h2>
        </div>
        <div class=""content"">
            <div class=""field"">
                <div class=""label"">Sender Name</div>
                <div class=""value"">{WebUtility.HtmlEncode(name)}</div>
            </div>
            <div class=""field"">
                <div class=""label"">Email Address</div>
                <div class=""value""><a href=""mailto:{WebUtility.HtmlEncode(email)}"" style=""color: #38bdf8;"">{WebUtility.HtmlEncode(email)}</a></div>
            </div>
            <div class=""field"">
                <div class=""label"">Subject</div>
                <div class=""value"">{WebUtility.HtmlEncode(subject)}</div>
            </div>
            <div class=""field"">
                <div class=""label"">Message Details</div>
                <div class=""value message-box"">{WebUtility.HtmlEncode(message)}</div>
            </div>
            <div style=""text-align: center; margin-top: 24px;"">
                <a href=""mailto:{WebUtility.HtmlEncode(email)}?subject=Re: {WebUtility.UrlEncode(subject)}"" class=""btn"">Direct Reply to {WebUtility.HtmlEncode(name)}</a>
            </div>
        </div>
        <div class=""footer"">
            Received on {DateTime.UtcNow:yyyy-MM-dd HH:mm:ss} UTC • Nitin Pimpalkar Portfolio System
        </div>
    </div>
</body>
</html>";

            await client.SendMailAsync(mailMessage);
            _logger.LogInformation("Contact notification email sent successfully to {RecipientEmail} for inquiry from {SenderEmail}", recipientEmail, email);
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send contact notification email for inquiry from {SenderEmail}", email);
            return false;
        }
    }
}
