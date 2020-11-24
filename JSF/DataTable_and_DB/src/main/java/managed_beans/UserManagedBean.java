/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package managed_beans;

import entities.User;
import java.io.Serializable;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.PostConstruct;
import javax.inject.Named;
import javax.faces.annotation.FacesConfig;
import javax.faces.view.ViewScoped;

/**
 *
 * @author Ika
 */
@Named(value = "userManagedBean")
@ViewScoped
@FacesConfig(version = FacesConfig.Version.JSF_2_3)
public class UserManagedBean implements Serializable{
    
    private List<User> users;
    
    public UserManagedBean() {
    }
    
    @PostConstruct
    public void getAllUsersFromDB(){
        users = new ArrayList<>();
        
        Connection conn = util.DB.getInstance().getConnection();
        try{
            Statement stm = conn.createStatement();
            ResultSet rs = stm.executeQuery("select * from users");
            while(rs.next()){
                User user = new User();
                user.setId(rs.getInt("id"));
                user.setUsername(rs.getString("username"));
                user.setPassword(rs.getString("password"));
                
                users.add(user);
            }
            
            stm.close();
        }catch(SQLException ex){
            Logger.getLogger(UserManagedBean.class.getName()).log(Level.SEVERE, null, ex);
        }finally{
            util.DB.getInstance().putConnection(conn);
        }
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
    
    public void saveData(User user){
        user.setEdit(false);
    }
    
     public void delete (User user){
        users.remove(user);
    }
    
}
