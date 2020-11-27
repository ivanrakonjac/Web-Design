/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import dodaci.DB;
import entities.Manifestation;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Ika
 */
public class ManifestationDAO {
    public ArrayList<Manifestation> getAllManifestations() {
        Connection con = DB.getInstance().getConnection();
        if (con == null) {
            System.err.println("*** Neuspesna konekcija na bazu podataka! ***");
            return null;
        }
        ArrayList<Manifestation> all = new ArrayList<>();
        try (PreparedStatement ps = con.prepareStatement("select * from manifestations")) {
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Manifestation m = new Manifestation();
                m.setId(rs.getInt("id"));
                m.setName(rs.getString("name"));
                m.setType(rs.getString("type"));
                m.setStatus(rs.getString("status"));
                m.setOrganizer(rs.getString("organizer"));
                
                m.setDateFrom(rs.getDate("date_from").toLocalDate());
                m.setDateTo(rs.getDate("date_to").toLocalDate());

                all.add(m);
            }
        } catch (SQLException ex) {
            Logger.getLogger(UserDAO.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            DB.getInstance().putConnection(con);
        }
        return all;
    }
    
    public ArrayList<Manifestation> getAllNewManifestations() {
        Connection con = DB.getInstance().getConnection();
        if (con == null) {
            System.err.println("*** Neuspesna konekcija na bazu podataka! ***");
            return null;
        }
        ArrayList<Manifestation> allNew = new ArrayList<>();
        try (PreparedStatement ps = con.prepareStatement("select * from manifestations where status='nova'")) {
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Manifestation m = new Manifestation();
                m.setId(rs.getInt("id"));
                m.setName(rs.getString("name"));
                m.setType(rs.getString("type"));
                m.setStatus(rs.getString("status"));
                m.setOrganizer(rs.getString("organizer"));
                
                m.setDateFrom(rs.getDate("date_from").toLocalDate());
                m.setDateTo(rs.getDate("date_to").toLocalDate());

                allNew.add(m);
            }
        } catch (SQLException ex) {
            Logger.getLogger(UserDAO.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            DB.getInstance().putConnection(con);
        }
        return allNew;
    }
    
    public boolean changeManifeststionStatus(int id, String newStatus) {
        Connection con = DB.getInstance().getConnection();
        if (con == null) {
            System.err.println("*** Neuspesna konekcija na bazu podataka! ***");
            return false;
        }
        
        try (PreparedStatement ps = con.prepareStatement("update manifestations set status=? where id=?")) {
            ps.setString(1, newStatus);
            ps.setInt(2, id);

            return ps.executeUpdate() != 0;

        } catch (SQLException ex) {
            Logger.getLogger(UserDAO.class.getName()).log(Level.SEVERE, null, ex);
            return false;
        } finally {
            DB.getInstance().putConnection(con);
        }
    }
    
    public ArrayList<Manifestation> getManifestationsByUser(String org) {
        Connection con = DB.getInstance().getConnection();
        if (con == null) {
            System.err.println("*** Neuspesna konekcija na bazu podataka! ***");
            return null;
        }
        ArrayList<Manifestation> all = new ArrayList<>();
        try (PreparedStatement ps = con.prepareStatement("select * from manifestations where organizer=?")) {
            ps.setString(1, org);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Manifestation m = new Manifestation();
                m.setId(rs.getInt("id"));
                m.setName(rs.getString("name"));
                m.setType(rs.getString("type"));
                m.setStatus(rs.getString("status"));
                m.setOrganizer(rs.getString("organizer"));
                m.setDateTo(rs.getDate("date_to").toLocalDate());
                m.setDateFrom(rs.getDate("date_from").toLocalDate());
               
                all.add(m);
            }
        } catch (SQLException ex) {
            Logger.getLogger(UserDAO.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            DB.getInstance().putConnection(con);
        }
        return all;
    }
    
    public boolean insertManifestation(Manifestation m) {
        Connection con = DB.getInstance().getConnection();
        if (con == null) {
            System.err.println("*** Neuspesna konekcija na bazu podataka! ***");
            return false;
        }
        
        try (PreparedStatement ps = con.prepareStatement("insert into manifestations (name,date_from,date_to,type,status,organizer) values(?,?,?,?,?,?)")) {
            ps.setString(1, m.getName());
            ps.setDate(2, java.sql.Date.valueOf(m.getDateFrom()));
            ps.setDate(3, java.sql.Date.valueOf(m.getDateTo()));
            ps.setString(4, m.getType());
            ps.setString(5, m.getStatus());
            ps.setString(6, m.getOrganizer());

            return ps.executeUpdate() != 0;

        } catch (SQLException ex) {
            Logger.getLogger(UserDAO.class.getName()).log(Level.SEVERE, null, ex);
            return false;
        } finally {
            DB.getInstance().putConnection(con);
        }
    }


}
