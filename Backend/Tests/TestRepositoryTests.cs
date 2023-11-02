using DataAccess.Repository;

namespace Tests;

public class TestRepositoryTests
{
    [Fact]
    public void CanGetAllEntities()
    {
        var repository = new TestRepository(new DataAccess.DataAccess().Factory);
        
        var entities = repository.GetAll();
        
        Assert.NotEmpty(entities);
    }
}