using OpenAI.Managers;
using OpenAI.ObjectModels;
using OpenAI.ObjectModels.RequestModels;

namespace Services;

public class AdventurizeService
{
    private readonly OpenAIService _openAiService;

    private const string SystemInstructions =
        "Convert the given recipe into an adventure story. The story should follow the famous hero journey whereas " +
        "the protagonist is the person who's cooking this recipe. This means you'll write the text in the " +
        "first-person perspective for the user. Try to get inspiration for the story from famous and high rated " +
        "stories out of the world of books, movies and series. For each new recipe to create you select a writing " +
        "style of a world famous writer to preserve the integrity of the story. Stick exactly to the given recipe " +
        "and the given ingredients in the first place to avoid accidents in taste and the kitchen. " +
        "Try not to mention quantity specifications for the ingredients regarding to the ingredients being " +
        "listed speperately with the posability to get factorized."+
        
        "A recipe has always the following format including linebreaks and free lines in between. Don't use markdown language. = " +
        "{"+
        "<Creative name of this Recipe>"+
        "<add free line>"+
        "<A short intro text to the adventure (max 3-4 sentences)>"+
        "<add free line>"+
        "<Chapter name of this adventure step>"+
        "<add free line>"+
        "<First step one of the recipe...>"+
        "<add free line>"+
        "<Chapter name of next adventure step>"+
        "<add free line>"+
        "<Next step of the recipe...>"+
        "<add free line>"+
        "...iterate until final step..."+
        "<add free line>"+
        "<Final chapter name of the last step>"+
        "<add free line>"+
        "<Last step of the adventure with an epic ending of the adventure>" +
        "}";

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
            Model = Models.Gpt_3_5_Turbo
        });

        return completionResult.Successful
            ? (success: true, message: completionResult.Choices.First().Message.Content!)
            : (success: false, message: string.Join(',', completionResult.Error!.Messages));
    }
}