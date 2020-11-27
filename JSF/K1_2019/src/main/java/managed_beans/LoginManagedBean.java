/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package managed_beans;

import dao.KorisnikDAO;
import dodaci.SessionUtils;
import entities.Korisnik;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.inject.Named;
import javax.enterprise.context.RequestScoped;
import javax.faces.annotation.FacesConfig;

/**
 *
 * @author Ika
 */
@Named(value = "loginManagedBean")
@RequestScoped
@FacesConfig(version = FacesConfig.Version.JSF_2_3)
public class LoginManagedBean {
    
    private KorisnikDAO korDAO;
    private ArrayList<Korisnik> allUsrs;

    private String username;
    private String password;
    private String type;
    
    private String message;

    public LoginManagedBean() {
        korDAO = new KorisnikDAO();
        allUsrs = korDAO.getAllUsers();
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
    
    public ArrayList<Korisnik> getAllUsrs() {
        return allUsrs;
    }

    public void setAllUsrs(ArrayList<Korisnik> allUsrs) {
        this.allUsrs = allUsrs;
    }

    
    public String login(){
        Korisnik user = korDAO.login(username, password);
        
        if (user == null) {
            message = "Greska u konekciji ka bazi";
        } else if (user.getUsername() == null) {
            message = "Korisnik ne postoji u bazi";
            username = "";
            password = "";
        } else if (user.getPassword() == null) {
            message = "Pogresna lozinka";
            password = "";
        } else {
            // message = "All good!";
            message = "";
            SessionUtils.getSession().setAttribute("user", user);
            if (user.isIsAdmin() && type.equals("admin")) {
                return "admin";
            } else if(!user.isIsAdmin() && type.equals("nastavnik")){
                return "nastavnik";
            } else {
                message = "Nemate te privilegije!";
            }
        }
        return "index";
        
        
    }
    
}
