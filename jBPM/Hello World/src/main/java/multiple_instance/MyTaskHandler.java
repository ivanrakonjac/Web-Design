package multiple_instance;

import org.kie.api.runtime.process.WorkItem;
import org.kie.api.runtime.process.WorkItemHandler;
import org.kie.api.runtime.process.WorkItemManager;

public class MyTaskHandler implements WorkItemHandler{

	@Override
	public void executeWorkItem(WorkItem workItem, WorkItemManager manager) {
		System.out.println(workItem.getParameter("ActorId") + " | " + workItem.getParameter("Comment"));
		manager.completeWorkItem(workItem.getId(), null);
	}

	@Override
	public void abortWorkItem(WorkItem workItem, WorkItemManager manager) {
		// TODO Auto-generated method stub
		
	}

	
	
}
