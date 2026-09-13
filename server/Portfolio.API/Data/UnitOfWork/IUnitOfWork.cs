using Portfolio.API.Data.Repositories;
using Portfolio.API.Models;

namespace Portfolio.API.Data.UnitOfWork;

public interface IUnitOfWork : IDisposable, IAsyncDisposable
{
    IRepository<T> Repository<T>() where T : BaseEntity;
    Task<int> CompleteAsync();
}
