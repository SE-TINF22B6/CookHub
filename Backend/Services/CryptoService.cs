using System.Security.Cryptography;
using System.Text;

namespace Services;

public static class CryptoService
{
    public static byte[] GetHash(string inputString)
        => SHA256.HashData(Encoding.UTF8.GetBytes(inputString));

    public static string GenerateToken()
        => Convert.ToBase64String(RandomNumberGenerator.GetBytes(24))
            .Replace('+', '-')
            .Replace('/', '_');
}