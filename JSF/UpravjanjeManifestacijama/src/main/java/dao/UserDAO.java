/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import dodaci.DB;
import entities.User;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Ika
 */
public class UserDAO {
    public User login(String username, String password) {
        Connection con = DB.getInstance().getConnection();
        if (con == null) {
            System.err.println("*** Neuspesna konekcija na bazu podataka! ***");
            return null;
        }
        User user = new User();
        try (PreparedStatement ps = con.prepareStatement("select * from users where username=?")) {
            ps.setString(1, username);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                user.setUsername(username);
                // postoji korisnik - treba proveriti lozinku
                String p = rs.getString("password");
                if (p.equals(password)) {
                    // poklapa se lozinka - to je taj korisnik, pokupimo ostale podatke
                    user.setPassword(password);
                    user.setFirstName(rs.getString("first_name"));
                    user.setLastName(rs.getString("last_name"));
                    user.setIsAdmin(rs.getBoolean("is_admin"));
                } else {
                    // ako se ne poklapa lozinka - stavicemo da lozinka bude null
                    user.setPassword(null);
                }
            } else {
                // ne postoji korisnik sa tim korisnickim imenom - vraticemo null username
                user.setUsername(null);
            }
        } catch (SQLException ex) {
            Logger.getLogger(UserDAO.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            DB.getInstance().putConnection(con);
        }
        return user;
    }

}
