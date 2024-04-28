using FluentNHibernate.Conventions;
using Newtonsoft.Json;

namespace Services;

public static class ConfigService
{
    public static Config Config { get; private set; }
    
    private const string ConfigFileName = "../config.json";
    
    static ConfigService()
    {
        if (!File.Exists(ConfigFileName))
        {
            CreateNewConfigFile();
            return;
        }
        
        var configContent = File.ReadAllText(ConfigFileName);

        if (configContent.IsEmpty())
        {
            CreateNewConfigFile();
            return;
        }

        Config = JsonConvert.DeserializeObject<Config>(configContent);
    }

    private static void CreateNewConfigFile()
    {
        Config = new Config();
        using var streamWriter = File.CreateText(ConfigFileName);
        streamWriter.Write(JsonConvert.SerializeObject(Config, Formatting.Indented));
        streamWriter.Flush();
    }
}