/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package managed_beans;

import dao.KorisnikDAO;
import dodaci.SessionUtils;
import entities.Korisnik;
import javax.inject.Named;
import javax.enterprise.context.RequestScoped;
import javax.faces.annotation.FacesConfig;

/**
 *
 * @author Ika
 */
@Named(value = "adminManagedBean")
@RequestScoped
@FacesConfig(version = FacesConfig.Version.JSF_2_3)
public class AdminManagedBean {

    private Korisnik editUser;

    public Korisnik getEditUser() {
        return editUser;
    }

    public void setEditUser(Korisnik editUser) {
        this.editUser = editUser;
    }
    
    public String goToEdit(Korisnik user){
        editUser = user;
        SessionUtils.getSession().setAttribute("editUser", user);
        return "editUser";
    }
    
    public String editUser(Korisnik user){
        KorisnikDAO korDAO = new KorisnikDAO();
        korDAO.changeUser(user);
        return "admin";
    }
}
