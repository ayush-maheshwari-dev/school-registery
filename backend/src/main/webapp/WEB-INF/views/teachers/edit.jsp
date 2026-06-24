<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<% request.setAttribute("pageTitle", "Edit Teacher — SchoolMS"); %>
<% request.setAttribute("currentPage", "teachers"); %>
<%@ include file="../common/header.jsp" %>

    <div class="page-header">
        <div>
            <h1>✏️ Edit Teacher</h1>
            <div class="page-subtitle">Update teacher details</div>
        </div>
        <a href="/teachers" class="btn btn-ghost">← Back to Teachers</a>
    </div>

    <div class="form-card">
       <%-- <form:form action="/teachers/edit/${teacher.id}"
                   method="post"
                   modelAttribute="teacher"
                   onsubmit="return validateTeacher()"> --%>

    <form:form action="/teachers/edit/${teacher.id}" method="post" modelAttribute="teacher">

            <div class="form-group">
                <label>Name</label>
                <form:input id="name" path="name"/>
                <form:errors path="name" style="color:red; font-size:0.82rem;"/>
            </div>

            <div class="form-group">
                <label>Email</label>
                <form:input id="email" path="email"/>
                <form:errors path="email" style="color:red; font-size:0.82rem;"/>
            </div>

            <div class="form-group">
                <label>Subject</label>
                <form:select id="course" path="subject">
                    <form:option value="English">English</form:option>
                    <form:option value="Spring">Spring</form:option>
                    <form:option value="Hibernate">Hibernate</form:option>
                    <form:option value="Electronic">Electronic</form:option>
                    <form:option value="Communication">Communication</form:option>
                </form:select>
                 <form:errors path="subject" style="color:red; font-size:0.82rem;"/>
            </div>

            <div class="form-group">
                <label>Department</label>
                <form:select id="department" path="department">
                    <form:option value="Information Technology">Information Technology</form:option>
                    <form:option value="Electronic & Communication">Electronic & Communication</form:option>
                    <form:option value="Literature">Literature</form:option>
                    <form:option value="Mechanical">Mechanical</form:option>
                </form:select>
                 <form:errors path="department" style="color:red; font-size:0.82rem;"/>
            </div>

            <div class="form-group">
                <label>Experience (years)</label>
                <form:input id="experience" path="experience" type="number"/>
                <form:errors path="experience" style="color:red; font-size:0.82rem;"/>
            </div>

            <div class="form-group">
                <label>Salary (₹)</label>
                <form:input id="salary" path="salary" type="number"/>
                <form:errors path="salary" style="color:red; font-size:0.82rem;"/>
            </div>

            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Update Teacher</button>
                <a href="/teachers" class="btn btn-ghost">Cancel</a>
            </div>

        </form:form>
    </div>

    <script src="${pageContext.request.contextPath}/js/script.js"></script>

<%@ include file="../common/footer.jsp" %>
