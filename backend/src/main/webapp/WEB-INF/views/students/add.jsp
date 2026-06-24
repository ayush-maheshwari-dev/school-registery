<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<% request.setAttribute("pageTitle", "Add Student — SchoolMS"); %>
<% request.setAttribute("currentPage", "students"); %>
<%@ include file="../common/header.jsp" %>

    <div class="page-header">
        <div>
            <h1>➕ Add New Student</h1>
            <div class="page-subtitle">Fill in the details below</div>
        </div>
        <a href="/students" class="btn btn-ghost">← Back to Students</a>
    </div>

    <div class="form-card">
       <%-- <form:form action="/students/add" method="post"
                   modelAttribute="student"
                   onsubmit="return validate()"> --%>

    <form:form action="/students/add" method="post" modelAttribute="student">

            <div class="form-group">
                <label>Name</label>
                <form:input id="name" path="name" placeholder="Enter full name"/>
                <form:errors path="name" style="color:red; font-size:0.82rem;"/>
            </div>

            <div class="form-group">
                <label>Email</label>
                <form:input id="email" path="email" placeholder="Enter email address"/>
                <form:errors path="email"  style="color:red; font-size:0.82rem;"/>
            </div>

            <div class="form-group">
                <label>Course</label>
                <form:select id="course" path="course">
                    <form:option value="">-- Select Course --</form:option>
                    <form:option value="Spring MVC">Spring MVC</form:option>
                    <form:option value="Java">Java</form:option>
                    <form:option value="Hibernate">Hibernate</form:option>
                    <form:option value="React">React</form:option>
                    <form:option value="English">English</form:option>
                    <form:option value="Maths">Maths</form:option>
                    <form:option value="Physical Education">Physical Education</form:option>
                    <form:option value="Orthology">Orthology</form:option>
                </form:select>
                <form:errors path="course" style="color:red; font-size:0.82rem;"/>
            </div>

            <div class="form-group">
                <label>Year</label>
                <form:input id="year" path="year" type="number" placeholder="e.g. 2024"/>
                <form:errors path="year"   style="color:red; font-size:0.82rem;"/>
            </div>

            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Save Student</button>
                <a href="/students" class="btn btn-ghost">Cancel</a>
            </div>

        </form:form>
    </div>

    <script src="${pageContext.request.contextPath}/js/script.js"></script>

<%@ include file="../common/footer.jsp" %>
