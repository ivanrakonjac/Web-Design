/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import dodaci.DB;
import entities.Korisnik;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Ika
 */
public class KorisnikDAO {
    
    public Korisnik login(String username, String password) {
        Connection con = DB.getInstance().getConnection();
        if (con == null) {
            System.err.println("*** Neuspesna konekcija na bazu podataka! ***");
            return null;
        }
        Korisnik user = new Korisnik();
        try (PreparedStatement ps = con.prepareStatement("select * from korisnik where username=?")) {
            ps.setString(1, username);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                user.setUsername(username);
                // postoji korisnik - treba proveriti lozinku
                String p = rs.getString("password");
                if (p.equals(password)) {
                    // poklapa se lozinka - to je taj korisnik, pokupimo ostale podatke
                    user.setPassword(password);
                    user.setFirstname(rs.getString("firstname"));
                    user.setLastname(rs.getString("lastname"));
                    user.setBirthday(rs.getDate("birthday").toLocalDate());
                    user.setIsAdmin(rs.getBoolean("isAdmin"));
                    user.setPlayCurrentGame(rs.getBoolean("playCurrentGame"));
                } else {
                    // ako se ne poklapa lozinka - stavicemo da lozinka bude null
                    user.setPassword(null);
                }
            } else {
                // ne postoji korisnik sa tim korisnickim imenom - vraticemo null username
                user.setUsername(null);
            }
        } catch (SQLException ex) {
            Logger.getLogger(KorisnikDAO.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            DB.getInstance().putConnection(con);
        }
        return user;
    }
    
    public ArrayList<Korisnik> getAllUsers() {
        Connection con = DB.getInstance().getConnection();
        if (con == null) {
            System.err.println("*** Neuspesna konekcija na bazu podataka! ***");
            return null;
        }
        
        ArrayList<Korisnik> users = new ArrayList<>();
        
        try (PreparedStatement ps = con.prepareStatement("select * from korisnik")) {
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Korisnik user = new Korisnik();
                
                user.setUsername(rs.getString("username"));
                user.setPassword(rs.getString("password"));
                user.setFirstname(rs.getString("firstname"));
                user.setLastname(rs.getString("lastname"));
                user.setBirthday(rs.getDate("birthday").toLocalDate());
                user.setIsAdmin(rs.getBoolean("isAdmin"));
                user.setPlayCurrentGame(rs.getBoolean("playCurrentGame"));
                
                users.add(user);
            }
        } catch (SQLException ex) {
            Logger.getLogger(KorisnikDAO.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            DB.getInstance().putConnection(con);
        }
        return users;
    }



}
