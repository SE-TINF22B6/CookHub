using DataAccess.Repository;

namespace Services;

public class TestService
{
    private readonly TestRepository _repository;

    public TestService(TestRepository repository)
    {
        _repository = repository;
    }
    
    // TODO: add methods
}