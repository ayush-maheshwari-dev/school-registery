<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<% request.setAttribute("pageTitle", "Error — SchoolMS"); %>
<% request.setAttribute("currentPage", ""); %>
<%@ include file="common/header.jsp" %>

    <div class="error-page">
        <div class="error-container">
            <div class="error-icon">⚠️</div>
            <h1 class="error-title">Oops! Something went wrong</h1>
            <p class="error-message">${errorMessage != null ? errorMessage : 'An unexpected error occurred.'}</p>
            <a href="${backUrl != null ? backUrl : '/'}" class="btn btn-primary">← Go Back</a>
        </div>
    </div>

<%@ include file="common/footer.jsp" %>
