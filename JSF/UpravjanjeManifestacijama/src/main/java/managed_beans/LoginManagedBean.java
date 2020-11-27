/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package managed_beans;

import dao.UserDAO;
import dodaci.SessionUtils;
import entities.User;
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

    private String username;
    private String password;
    private String message;
    
    public LoginManagedBean() {
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
    
    
    public String login() {
        UserDAO userDAO = new UserDAO();
        User user = userDAO.login(username, password);
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
            if (user.isIsAdmin()) {
                return "administrator";
            } else {
                return "organizator";
            }
        }
        return "";
    }
    
    public String logout(){
        SessionUtils.getSession().invalidate();
        username = "";
        password = "";
        return "index";
    }
    
    
    
}
