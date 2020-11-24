/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package managed_beans;

import javax.inject.Named;
import javax.enterprise.context.RequestScoped;
import javax.faces.annotation.FacesConfig;
import javax.validation.constraints.Size;

/**
 *
 * @author Ika
 */
@Named(value = "validateBean")
@RequestScoped
@FacesConfig (version = FacesConfig.Version.JSF_2_3)
public class ValidateBean {

    @Size(min = 3, max = 10)
    private String polje;
    
    public ValidateBean() {
          
    }
        
    public String getPolje() {
        return polje;
    }

    public void setPolje(String polje) {
        this.polje = polje;
    }
    
}
