/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package managed_beans;

import entities.User;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.inject.Named;
import javax.enterprise.context.RequestScoped;
import javax.faces.annotation.FacesConfig;

/**
 *
 * @author Ika
 */
@Named(value = "usersManagedBean")
@RequestScoped
@FacesConfig(version = FacesConfig.Version.JSF_2_3)
public class UsersManagedBean {
    
    private String prezime;
    private String predavac;

    /**
     * Creates a new instance of UsersManagedBean
     */
    public UsersManagedBean() {
    }
    
    private List<User> korisnici;
    
    @PostConstruct
    private void dodajKorisnike(){
        korisnici = new ArrayList<>();
        korisnici.add(new User("Pera","Peric"));
        korisnici.add(new User("Zika","Zikic"));
        korisnici.add(new User("Mika","Mikic"));
    }

    public List<User> getKorisnici() {
        return korisnici;
    }

    public void setKorisnici(List<User> korisnici) {
        this.korisnici = korisnici;
    }

    public String getPrezime() {
        return prezime;
    }

    public void setPrezime(String prezime) {
        this.prezime = prezime;
    }

    public String getPredavac() {
        return predavac;
    }

    public void setPredavac(String predavac) {
        this.predavac = predavac;
    }
    
    private HashMap<String,String> predavaci = new HashMap<String,String>(){{
        put("Mara", "Maric");
        put("Joca", "Jocic");
    }};

    public HashMap<String, String> getPredavaci() {
        return predavaci;
    }

    public void setPredavaci(HashMap<String, String> predavaci) {
        this.predavaci = predavaci;
    }
    
    
    private List<String> ucenici;

    public List<String> getUcenici() {
        return ucenici;
    }

    public void setUcenici(List<String> ucenici) {
        this.ucenici = ucenici;
    }
    
    
    private String[] osoblje;

    public String[] getOsoblje() {
        return osoblje;
    }

    public void setOsoblje(String[] osoblje) {
        this.osoblje = osoblje;
    }
    
    
    
    
    
    
}
