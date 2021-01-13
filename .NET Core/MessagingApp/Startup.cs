using AutoMapper;
using MessagingApp.Factories;
using MessagingApp.Hubs;
using MessagingApp.Models.Database;
using MessagingAppTest.Models.Initializers;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace MessagingApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<MessagingAppContext> ( 
                options => options.UseSqlServer( this.Configuration.GetConnectionString ( "MessagingAppDB" ))
            );
            services.AddIdentity<User, IdentityRole> (
                options => {
                    options.Password.RequireDigit = false;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequireUppercase = false;
                    options.Password.RequiredLength = 2;
                }
             ).AddEntityFrameworkStores<MessagingAppContext> ( );
            
            services.AddRazorPages().AddRazorRuntimeCompilation();

            services.AddAutoMapper (typeof(Startup));

            services.ConfigureApplicationCookie (
                options => {
                    options.LoginPath = "/User/Login";
                    options.AccessDeniedPath = "/Home/Error";
                }
            );

            services.AddScoped<IUserClaimsPrincipalFactory<User>, ClaimFactory> ( );

            services.AddSignalR ( );

            services.AddControllersWithViews();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        // Ova metoda se poziva prilikom svakog pokretanja
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, UserManager<User> userManager)
        {
            if (env.IsDevelopment())
            {
                UserInitializer.initialize ( userManager );
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<ChatHub> ( "/update" );
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
