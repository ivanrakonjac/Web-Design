/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package managed_beans;

import dao.ManifestationDAO;
import entities.Manifestation;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.PostConstruct;
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

    private List<Manifestation> allManifestations;
    private List<Manifestation> allNewMan;
    
    @PostConstruct
    public void setAll(){
        ManifestationDAO mdao = new ManifestationDAO();
        allManifestations = mdao.getAllManifestations();
        allNewMan = mdao.getAllNewManifestations();
    }
    
    public void getAllNewManFromDB() {
        ManifestationDAO mdao = new ManifestationDAO();
        allNewMan = mdao.getAllNewManifestations();
    } 
    
    public void getAllManFromDB() {
        ManifestationDAO mdao = new ManifestationDAO();
        allManifestations = mdao.getAllManifestations();
    } 

    public List<Manifestation> getAllManifestations() {
        return allManifestations;
    }

    public void setAllManifestations(List<Manifestation> allManifestations) {
        this.allManifestations = allManifestations;
    }

    public List<Manifestation> getAllNewMan() {
        return allNewMan;
    }

    public void setAllNewMan(List<Manifestation> allNewMan) {
        this.allNewMan = allNewMan;
    }
    
    public String approve(int id) {
        ManifestationDAO mdao = new ManifestationDAO();
        boolean successs = mdao.changeManifeststionStatus(id, "odobrena");
        if (successs) {
            getAllManFromDB();
        }
        return "administrator";
    }
    
    public void disapprove(int id) {
        ManifestationDAO mdao = new ManifestationDAO();
        boolean successs = mdao.changeManifeststionStatus(id, "odbijena");
        if (successs) {
           getAllManFromDB();
        }
    }
    
}
