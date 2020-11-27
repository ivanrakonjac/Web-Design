/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package managed_beans;

import dao.ManifestationDAO;
import dodaci.SessionUtils;
import entities.Manifestation;
import entities.User;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import javax.annotation.PostConstruct;
import javax.inject.Named;
import javax.enterprise.context.RequestScoped;
import javax.faces.annotation.FacesConfig;

/**
 *
 * @author Ika
 */
@Named(value = "organizerManagedBean")
@RequestScoped
@FacesConfig(version = FacesConfig.Version.JSF_2_3)
public class OrganizerManagedBean {

    private ArrayList<Manifestation> allMine = new ArrayList<>();
    
    private String name;
    private Date dateFrom;
    private Date dateTo;
    private String type;
    
    @PostConstruct
    public void getEvents() {
        ManifestationDAO mdao = new ManifestationDAO();
        String loggedIn = ((User) SessionUtils.getSession().getAttribute("user")).getUsername();
        allMine = mdao.getManifestationsByUser(loggedIn);
    }
    
    public void getAllMineFromDB() {
        ManifestationDAO mdao = new ManifestationDAO();
        String loggedIn = ((User) SessionUtils.getSession().getAttribute("user")).getUsername();
        allMine = mdao.getManifestationsByUser(loggedIn);
    }

    public ArrayList<Manifestation> getAllMine() {
        return allMine;
    }

    public void setAllMine(ArrayList<Manifestation> allMine) {
        this.allMine = allMine;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getDateFrom() {
        return dateFrom;
    }

    public void setDateFrom(Date dateFrom) {
        this.dateFrom = dateFrom;
    }

    public Date getDateTo() {
        return dateTo;
    }

    public void setDateTo(Date dateTo) {
        this.dateTo = dateTo;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
    
    public void unesi() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String loggedIn = ((User) SessionUtils.getSession().getAttribute("user")).getUsername();

        Manifestation m = new Manifestation();
        m.setName(name);
        m.setDateFrom(LocalDate.parse(sdf.format(dateFrom)));
        m.setDateTo(LocalDate.parse(sdf.format(dateTo)));
        m.setOrganizer(loggedIn);
        m.setType(type);
        m.setStatus("nova");
        ManifestationDAO mdao = new ManifestationDAO();
        if (!mdao.insertManifestation(m)) {
            System.err.println("Something was wrong while inserting...");
            return;
        }
        
        allMine = mdao.getManifestationsByUser(loggedIn);
        name = "";
        dateFrom = null;
        dateTo = null;
    }
    
    public void otkazi(int id) {
        ManifestationDAO mdao = new ManifestationDAO();
        boolean successs = mdao.changeManifeststionStatus(id, "otkazana");
        if (successs) {
            getAllMineFromDB();
        }
    }
    
}
