using DataAccess.Repository;

namespace Services;

public class UserService
{
    private readonly UserRepository _repository;

    public UserService(UserRepository repository)
    {
        _repository = repository;
    }
    
    // TODO: add methods
}