<%@include file="/libs/foundation/global.jsp"%><%
%><%@include file="/apps/bedrock/components/global.jsp"%><%
%><%@ page import="com.day.cq.i18n.I18n, java.util.Locale, java.util.ResourceBundle, com.day.cq.wcm.api.WCMMode, com.day.cq.wcm.foundation.ELEvaluator" %><%
%><bedrock:defineObjects/><%
%><cq:setContentBundle /><%
%><%
	// read the redirect target from the 'page properties' and perform the
	// redirect if WCM is disabled.
	String location = properties.get("redirectTarget", "");
	// resolve variables in path
	location = ELEvaluator.evaluate(location, slingRequest, pageContext);
	boolean wcmModeIsDisabled = WCMMode.fromRequest(request) == WCMMode.DISABLED;
	boolean wcmModeIsPreview = WCMMode.fromRequest(request) == WCMMode.PREVIEW;
	if ( (location.length() > 0) && ((wcmModeIsDisabled) || (wcmModeIsPreview)) ) {
		// check for recursion
		if (currentPage != null && !location.equals(currentPage.getPath()) && location.length() > 0) {
			// check for absolute path
			final int protocolIndex = location.indexOf(":/");
			final int queryIndex = location.indexOf('?');
			final String redirectPath;
			if ( protocolIndex > -1 && (queryIndex == -1 || queryIndex > protocolIndex) ) {
				redirectPath = location;
			} else {
				redirectPath = slingRequest.getResourceResolver().map(request, location) + ".html";
			}
			response.sendRedirect(redirectPath);
		} else {
			response.sendError(HttpServletResponse.SC_NOT_FOUND);
		}
		return;
	}
	// set doctype
	if (currentDesign != null) {
		currentDesign.getDoctype(currentStyle).toRequest(request);
	}

    Locale pageLocale = currentPage.getLanguage(false);
    ResourceBundle resourceBundle = slingRequest.getResourceBundle(pageLocale);
    I18n i18n = new I18n(resourceBundle);
%>