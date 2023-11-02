using System.Reflection;
using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using NHibernate;
using NHibernate.Tool.hbm2ddl;

namespace DataAccess;

public class DataAccess
{
    public ISessionFactory Factory { get; } = Fluently.Configure()
        .Database(PostgreSQLConfiguration.Standard.ConnectionString("Server=localhost;Port=5432;User Id=postgres;Password=password;Database=cookhub;"))
        .Mappings(configuration =>
        {
            configuration.FluentMappings.AddFromAssembly(Assembly.GetExecutingAssembly());
        })
        .ExposeConfiguration(configuration => new SchemaUpdate(configuration).Execute(false, true))
        .BuildSessionFactory();
}