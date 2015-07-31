package com.icfi.aem.popcorn.components.content;

import com.citytechinc.aem.bedrock.api.node.ComponentNode;
import com.citytechinc.aem.bedrock.api.request.ComponentRequest;
import com.citytechinc.aem.bedrock.core.components.AbstractComponent;
import com.citytechinc.cq.component.annotations.*;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

@Component(value = "Popcorn Video",
		disableTargeting = true,
		layout = "rollover",
		dialogHeight = 500,
		dialogWidth = 900,
		listeners = {@Listener(name = "afterinsert", value = "REFRESH_PAGE"), @Listener(name = "afteredit", value = "REFRESH_PAGE")})
public class PopcornVideo extends AbstractComponent {
	private static final Logger LOG = LoggerFactory.getLogger(PopcornVideo.class);

	private String errorValue;

	private List<String> componentPaths = new ArrayList<String>();

	@Override
	public void init(final ComponentRequest request) {
        List<ComponentNode> nodes = getComponentNodes("components");

        for (ComponentNode node : nodes) {
            LOG.error("nodeName = " + node.getResource().getPath());
            componentPaths.add(node.get("componentPath", StringUtils.EMPTY));
        }
	}

	public List<String> getComponentPaths() {
		return componentPaths;
	}

}