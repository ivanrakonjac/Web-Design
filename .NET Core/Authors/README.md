#Authors

---docker---
docker-compose up -d
docker-compose ps

---dotnet---

dotnet new tool-manifest - komanda za pravljenje novog tool manifesta
dotnet add package imePaketa - komanda za dodavanje paketa

dotnet tool install dotnet-ef - komanda za instaliranje EntityFrameworka
dotnet tool install dotnet-aspnet-codegenerator - komanda za instaliranje codegeneratora

dotnet-aspnet-codegenerator

dotnet aspnet-codegenerator controller -name AuthorController -m Author -dc AuthorsContext -udl -outDir Controllers -namespace Authors.Controllers - komanda koja nam pravi controler, povezuje ga sa modelom -m, i dataContextom -dc, -udl povezuje sa vjuovima