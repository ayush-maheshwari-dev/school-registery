<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<% request.setAttribute("pageTitle", "Contact — SchoolMS"); %>
<% request.setAttribute("currentPage", "contact"); %>
<%@ include file="common/header.jsp" %>

    <div class="page-header">
        <div>
            <h1>📬 Contact</h1>
            <div class="page-subtitle">Get in touch with the school administration</div>
        </div>
    </div>

    <div class="contact-grid">
        <div class="contact-info-card">
            <h2>School Information</h2>
            <div class="contact-item">
                <span class="ci-icon">🏫</span>
                <span>SchoolMS — Model School, New Delhi</span>
            </div>
            <div class="contact-item">
                <span class="ci-icon">📞</span>
                <span>+91 98765 43210</span>
            </div>
            <div class="contact-item">
                <span class="ci-icon">📧</span>
                <span>admin@schoolms.edu.in</span>
            </div>
            <div class="contact-item">
                <span class="ci-icon">🕐</span>
                <span>Mon–Fri, 9:00 AM – 5:00 PM</span>
            </div>
        </div>

        <div class="form-card" style="margin-bottom:0;">
            <h2 style="margin-bottom:20px; font-size:1.1rem;">Send a Message</h2>
            <div class="form-group">
                <label>Your Name</label>
                <input type="text" placeholder="Enter your name"/>
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" placeholder="Enter your email"/>
            </div>
            <div class="form-group">
                <label>Message</label>
                <textarea rows="4"
                    style="width:100%;padding:9px 12px;border:1px solid var(--border);
                           border-radius:var(--radius);font-size:0.9rem;resize:vertical;
                           font-family:inherit;outline:none;"
                    placeholder="Write your message..."></textarea>
            </div>
            <div class="form-actions">
                <button class="btn btn-primary"
                        onclick="alert('Message sent! We will get back to you shortly.')">
                    Send Message
                </button>
            </div>
        </div>
    </div>

<%@ include file="common/footer.jsp" %>
