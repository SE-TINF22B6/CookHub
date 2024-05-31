namespace Services;

/// <summary>
/// Model for the config.json file.
/// Specifies the structure and the default values of the fields.
/// </summary>
public class Config
{
    public string DatabaseConnectionString { get; set; } = "";
    public string OpenAiToken { get; set; } = ""; // only enter the token in your local config.json file, not in the source code
}