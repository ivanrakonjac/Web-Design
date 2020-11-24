/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package converters;

import entities.User;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.faces.convert.FacesConverter;

/**
 *
 * @author Ika
 */
@FacesConverter("userConverter")
public class UserConverter implements Converter{

    @Override
    public Object getAsObject(FacesContext fc, UIComponent uic, String string) {
        User user = new User();
        user.setName(string);
        user.setUsername("Nije definisan");
        
        return user;
    }

    @Override
    public String getAsString(FacesContext fc, UIComponent uic, Object t) {
        return "Korisnik je: " + t.toString();
    }

}
