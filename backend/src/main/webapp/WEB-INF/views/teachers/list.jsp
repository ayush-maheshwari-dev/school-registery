<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<% request.setAttribute("pageTitle", "Teachers — SchoolMS"); %>
<% request.setAttribute("currentPage", "teachers"); %>
<%@ include file="../common/header.jsp" %>

    <div class="page-header">
        <div>
            <h1>👨‍🏫 Teachers</h1>
            <div class="page-subtitle">Manage all teaching staff</div>
        </div>
        <a href="/teachers/add" class="btn btn-primary">+ Add Teacher</a>
    </div>

    <div class="stats-row">
        <div class="stat-card">
            <div class="stat-value">${total}</div>
            <div class="stat-label">
                <c:choose>
                    <c:when test="${searchTerm != null}">Results for "${searchTerm}"</c:when>
                    <c:otherwise>Total Teachers</c:otherwise>
                </c:choose>
            </div>
        </div>
    </div>

    <div class="toolbar">
        <form class="search-form" action="/teachers/search" method="get">
            <input type="text" name="name"
                   placeholder="Search by name..."
                   value="${searchTerm}"/>
            <button type="submit" class="btn btn-primary btn-sm">Search</button>
            <c:if test="${searchTerm != null}">
                <a href="/teachers" class="btn btn-ghost btn-sm">Clear</a>
            </c:if>
        </form>
    </div>

    <div class="table-wrapper">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Department</th>
                    <th>Exp.</th>
                    <th>Salary</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <c:forEach var="teacher" items="${teachers}">
                <tr>
                    <td>${teacher.id}</td>
                    <td>${teacher.name}</td>
                    <td>${teacher.email}</td>
                    <td>${teacher.subject}</td>
                    <td>${teacher.department}</td>
                    <td>${teacher.experience} yrs</td>
                    <td>₹${teacher.salary}</td>
                    <td>
                        <div class="action-cell">
                            <a href="/teachers/edit/${teacher.id}" class="btn btn-blue btn-sm">Edit</a>
                            <form action="/teachers/delete/${teacher.id}" method="post" style="display:inline;">
                                <button type="submit"
                                        onclick="return confirm('Delete ${teacher.name}?')"
                                        class="btn btn-danger btn-sm">
                                    Delete
                                </button>
                            </form>
                        </div>
                    </td>
                </tr>
                </c:forEach>

                <c:if test="${empty teachers}">
                <tr>
                    <td colspan="8">
                        <div class="empty-state">
                            <div class="empty-icon">🔍</div>
                            <div>No teachers found.</div>
                        </div>
                    </td>
                </tr>
                </c:if>
            </tbody>
        </table>
    </div>

<%@ include file="../common/footer.jsp" %>
