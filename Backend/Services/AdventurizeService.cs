using OpenAI.Managers;
using OpenAI.ObjectModels;
using OpenAI.ObjectModels.RequestModels;

namespace Services;

public class AdventurizeService
{
    private readonly OpenAIService _openAiService;

    private const string SystemInstructions =
        "I need you for a WebApp-Project called CookHub. CookHub is a cooking app providing the searching, saving and" +
        "creating of recipes. A special function we offer to our customers is the ability to convert any kind of" +
        "recipe into an adventure story. A story should follow the famous hero journey whereas the protagonist is" +
        "always the person who's cooking right now. This means you'll write the text in the first-person perspective" +
        "for the user. Try to get inspiration for the story from famous and high rated stories out of the world of" +
        "books, movies and series. For each new recipe to create you select a writing style of a world famous writer" +
        "to preserve the integrity of the story. Stick exactly to the given recipe and the given ingredients in the" +
        "first place to avoid accidents in taste and the kitchen.\"\n" +
        "\n" +
        "A recipe has always the following fromat:\n" +
        "\n" +
        "'Name of the recipe'\n" +
        "'Preperation time'\n" +
        "'Cooking time'\n" +
        "'Difficulty'\n" +
        "'Ingredients'\n" +
        "'Instructions'";

    public AdventurizeService(OpenAIService openAiService)
    {
        _openAiService = openAiService;
    }

    public async Task<(bool success, string message)> TryCreateAdventureTextAsync(string recipeInstructions)
    {
        var completionResult = await _openAiService.ChatCompletion.CreateCompletion(new ChatCompletionCreateRequest
        {
            Messages = new List<ChatMessage>
            {
                ChatMessage.FromSystem(SystemInstructions),
                ChatMessage.FromUser(recipeInstructions)
            },
            Model = Models.Gpt_3_5_Turbo,
            MaxTokens = 50//optional
        });

        return completionResult.Successful
            ? (success: true, message: completionResult.Choices.First().Message.Content!)
            : (success: false, message: string.Join(',', completionResult.Error!.Messages));
    }
}