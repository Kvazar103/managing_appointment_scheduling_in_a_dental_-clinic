({
        handleSuccess: function (component, event, helper) {
            try {
                
                const recordId = event.getParam("id");
    
                alert("Patient record created successfully");
                
                const fieldIds = [
                    "name",
                    "lastName",
                    "dob",
                    "contactInfo",
                    "medicalInformation",
                    "notes",
                    "dentist"
                ];
    
                fieldIds.forEach((fieldId) => {
                    const field = component.find(fieldId);
                    if (field) {
                        field.set("v.value", null); 
                    } else {
                        console.warn(`Field with aura:id="${fieldId}" not found.`);
                    }
                });
    
                helper.navigateToPatientsPage(component);
            } catch (error) {
                console.error("Error in handleSuccess:", error);
            }
        },
    
        handleCancel: function (component, event, helper) {
            try {
                console.log("Cancel button clicked");
        
                
                const recordEditForm = component.find("recordEditForm");
                if (recordEditForm && recordEditForm.reset) {
                    console.log("Resetting the form...");
                    recordEditForm.reset();
                } else {
                    console.warn("recordEditForm is not available or does not support reset().");
                }
        
                
                helper.navigateToPatientsPage(component);
            } catch (error) {
                console.error("Error in handleCancel:", error);
            }
        },

    handleError: function (component, event, helper) {
        const errorMessage = event.getParam("message");
        alert("Error saving record: " + errorMessage);
    }
})