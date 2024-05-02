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
            Config = new Config();
            CreateNewConfigFile();
            return;
        }
        
        var configContent = File.ReadAllText(ConfigFileName);

        if (configContent.IsEmpty())
        {
            Config = new Config();
            CreateNewConfigFile();
            return;
        }

        Config = JsonConvert.DeserializeObject<Config>(configContent);
    }

    private static void CreateNewConfigFile()
    {
        using var streamWriter = File.CreateText(ConfigFileName);
        streamWriter.Write(JsonConvert.SerializeObject(Config, Formatting.Indented));
        streamWriter.Flush();
    }
}