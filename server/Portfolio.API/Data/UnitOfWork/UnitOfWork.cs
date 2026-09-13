using System.Collections.Concurrent;
using Portfolio.API.Data.Repositories;
using Portfolio.API.Models;

namespace Portfolio.API.Data.UnitOfWork;

public class UnitOfWork : IUnitOfWork
{
    private readonly PortfolioDbContext _context;
    private readonly ConcurrentDictionary<Type, object> _repositories = new();
    private bool _disposed;

    public UnitOfWork(PortfolioDbContext context)
    {
        _context = context;
    }

    public IRepository<T> Repository<T>() where T : BaseEntity
    {
        return (IRepository<T>)_repositories.GetOrAdd(typeof(T), _ => new Repository<T>(_context));
    }

    public async Task<int> CompleteAsync()
    {
        return await _context.SaveChangesAsync();
    }

    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }

    protected virtual void Dispose(bool disposing)
    {
        if (!_disposed)
        {
            if (disposing)
            {
                _context.Dispose();
            }
            _disposed = true;
        }
    }

    public async ValueTask DisposeAsync()
    {
        await _context.DisposeAsync();
        Dispose(false);
        GC.SuppressFinalize(this);
    }
}
