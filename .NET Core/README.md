# Beleske

---docker---

docker-compose up -d

docker-compose ps

---dotnet---

dotnet new mvc -n imeProjekta

dotnet new tool-manifest - komanda za pravljenje novog tool manifesta

dotnet add package imePaketa - komanda za dodavanje paketa

dotnet add package Microsoft.EntityFrameworkCore.SqlServer --version 5.0.2 - Komanda za dodavanje EF Sql servera

https://www.connectionstrings.com/sql-server/ - Link ka connection stringovima za sql server

dotnet tool install dotnet-ef - komanda za instaliranje EntityFramework toola ( da bi mogli da dodajemo migracije itd... )

--migracija baze --

dotnet ef migrations add imeMigracije - komanda za dodavanje migracije

dotnet ef database update - komanda za primenu migracija

dotnet ef migrations remove - za uklanjanje poslednje migracije

-- codegenerator --

dotnet tool install dotnet-aspnet-codegenerator - komanda za instaliranje codegeneratora
dotnet tool install --global dotnet-aspnet-codegenerator --version 3.1.1 -- za globalnu instalaciju (postoji verzija 3.1.1 i nova 5.0.1 koja ne radi sa .net corom 3.1)

dotnet-aspnet-codegenerator

dotnet aspnet-codegenerator controller -name AuthorController -m Author -dc AuthorsContext -udl -outDir Controllers -namespace Authors.Controllers - komanda koja nam pravi controler, povezuje ga sa modelom -m, i dataContextom -dc, -udl povezuje sa vjuovima

dotnet add package Microsoft.AspNetCore.Identity.EntityFrameworkCore - paket koji ima implementiranu autentifikaciju i autorizaciju

dotnet add package Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation ( --version 3.1.10 ako se javlja problem neki )- paket za kompajliranje u runtajmu

dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection - biblioteka za automatsko preslikavanje jedne klase u drugu

dotnet add package Microsoft.AspNetCore.Mvc.NewtonsoftJson --version 3.1.11 - paket za Serializaciju objekata u JSON


Linkovi ka dokumentaciji:

https://docs.microsoft.com/aspnet/core

https://www.entityframeworktutorial.net/efcore/entity-framework-core.aspx - EF Core tutorial ( jako dobar )

https://www.tektutorialshub.com/asp-net-core/asp-net-core-passing-data-from-controller-to-view/

https://hub.docker.com/_/microsoft-mssql-server

https://www.connectionstrings.com/sql-server/

https://docs.microsoft.com/en-us/aspnet/core/migration/identity?view=aspnetcore-5.0

https://www.learnentityframeworkcore.com/configuration/one-to-many-relationship-configuration - EF Core Relationships Tutorial

https://docs.microsoft.com/en-us/ef/core/modeling/relationships?tabs=fluent-api%2Cfluent-api-simple-key%2Csimple-key#conventions - EF Core Relationships Tutorial 2 

https://docs.microsoft.com/en-us/aspnet/core/tutorials/signalr?view=aspnetcore-5.0&tabs=visual-studio - Dokumentacija za SignalR biblioteku - start

https://docs.microsoft.com/en-us/aspnet/core/signalr/hubs?view=aspnetcore-5.0 - SignalR doc

https://docs.microsoft.com/en-us/aspnet/core/mvc/models/file-uploads?view=aspnetcore-5.0 - File uploading

https://docs.microsoft.com/en-us/aspnet/core/security/authorization/roles?view=aspnetcore-5.0 - Authorization

https://docs.microsoft.com/en-us/ef/core/modeling/concurrency?tabs=data-annotations - Concurrency

https://docs.microsoft.com/en-us/aspnet/core/data/ef-mvc/sort-filter-page?view=aspnetcore-5.0 - Sorting, filtering, and paging

https://docs.microsoft.com/en-us/aspnet/core/data/ef-mvc/concurrency?view=aspnetcore-5.0 - Handle concurrency 

https://dotnetcoretutorials.com/2019/12/19/using-newtonsoft-json-in-net-core-3-projects/ - How to use newtonsoft-json



https://mockaroo.com/ - Generator podataka

https://colorlib.com/wp/free-css3-html5-search-form-examples/ - Free search forme


Proces pravljnja projekta: 

dotnet new mvc -n imeProjekta

pisanje docker-compose fajla i pokretanj kontejnera

konekcja sa pokrenutim kontejnerom

dodavanje Context klase i ConnectionStringa u appsettings.json i Startup.cs

dodavanje paketa za SQL server

dodavanje EF toola