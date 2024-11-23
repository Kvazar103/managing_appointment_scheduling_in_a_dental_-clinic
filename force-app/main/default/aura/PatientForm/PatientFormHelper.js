({
    navigateToPatientsPage: function (component, event, helper) {
        try {
            console.log("button clicked");

            
            const navService = component.find("navigationMixin");
            if (navService) {
                navService.navigate({
                    type: "standard__objectPage",
                    attributes: {
                        objectApiName: "Patient__c", 
                        actionName: "home"
                    }
                });
            } else {
                console.warn("NavigationMixin not found");
                window.location.href = '/lightning/o/Patient__c/home';
            }
        } catch (error) {
            console.error("Error in handleCancel with NavigationMixin:", error);
            
            window.location.href = '/lightning/o/Patient__c/home';
        }
    }
});