/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package managed_beans;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.inject.Named;
import javax.enterprise.context.RequestScoped;
import javax.faces.annotation.FacesConfig;
import javax.faces.model.SelectItem;

/**
 *
 * @author Ika
 */
@Named(value = "managedBean1")
@RequestScoped
@FacesConfig (version = FacesConfig.Version.JSF_2_3)
public class ManagedBean1 {

    /**
     * Creates a new instance of ManagedBean1
     */
    public ManagedBean1() {
    }
    
    private String ime;
    private String prezime;
    private boolean slazemSe;
    private String pol;
    private String zanimanje;
    private String stavka;
    private String proizvod;

    public String getIme() {
        return ime;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    public String getPrezime() {
        return prezime;
    }

    public void setPrezime(String prezime) {
        this.prezime = prezime;
    }

    public boolean isSlazemSe() {
        return slazemSe;
    }

    public void setSlazemSe(boolean slazemSe) {
        this.slazemSe = slazemSe;
    }

    public String getPol() {
        return pol;
    }

    public void setPol(String pol) {
        this.pol = pol;
    }

    public String getZanimanje() {
        return zanimanje;
    }

    public void setZanimanje(String zanimanje) {
        this.zanimanje = zanimanje;
    }

    public String getStavka() {
        return stavka;
    }

    public void setStavka(String stavka) {
        this.stavka = stavka;
    }
    
     public String getProizvod() {
        return proizvod;
    }

    public void setProizvod(String proizvod) {
        this.proizvod = proizvod;
    }
    
    private List<SelectItem> stavke;

    public List<SelectItem> getStavke() {
        return stavke;
    }

    public void setStavke(List<SelectItem> stavke) {
        this.stavke = stavke;
    }
    
    @PostConstruct //ova anotacija nam poziva ovu metodu odmah posle konsutruktora (kao da smo dodali metodu u konstruktor)
    private void dodajStavke(){
        stavke = new ArrayList<>();
        stavke.add(new SelectItem("stavka1", "1"));
        stavke.add(new SelectItem("stavka2", "2"));
        stavke.add(new SelectItem("stavka3", "3"));
        
    }
    
    private SelectItem[] proizvodi = new SelectItem[]{
        new SelectItem("kafa", "kafa"),
        new SelectItem("caj", "caj"),
        new SelectItem("CocaCola", "CocaCola")
    };

    public SelectItem[] getProizvodi() {
        return proizvodi;
    }

    public void setProizvodi(SelectItem[] proizvodi) {
        this.proizvodi = proizvodi;
    }
    
    
    
}
