/*
 * Copyright 2017 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package factorial;

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.kie.api.KieBase;
import org.kie.api.KieServices;
import org.kie.api.internal.utils.KieService;
import org.kie.api.io.ResourceType;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.kie.api.runtime.manager.RuntimeEnvironmentBuilder;
import org.kie.api.runtime.manager.RuntimeManager;
import org.kie.api.runtime.manager.RuntimeManagerFactory;
import org.kie.internal.builder.KnowledgeBuilder;
import org.kie.internal.builder.KnowledgeBuilderFactory;
import org.kie.internal.io.ResourceFactory;
import org.kie.internal.runtime.StatefulKnowledgeSession;
import org.kie.internal.runtime.conf.AuditMode;
import org.kie.internal.runtime.conf.DeploymentDescriptor;
import org.kie.internal.runtime.manager.context.EmptyContext;
import org.kie.internal.runtime.manager.deploy.DeploymentDescriptorManager;
import org.kie.test.util.db.PersistenceUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * This is a sample file to launch a process.
 */
public class FactorialMain {
    
    public static final void main(String[] args) {
        // load up the knowledge base
        KieSession ksession = createKieSession("factorial_session");
        // start a new process instance
       
        Map<String, Object> map = new HashMap<>();
        map.put("n", 5);
        map.put("i", 1);
        
        ksession.startProcess("factorial_process", map);
    }

    private static KieSession createKieSession(String sessionName) {
    	KieServices ks = KieServices.Factory.get();
    	KieContainer kContainer = ks.getKieClasspathContainer();
        return kContainer.newKieSession(sessionName);
    }
    
}
