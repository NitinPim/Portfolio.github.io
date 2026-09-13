using System.Reflection;
using Portfolio.API.Data.Repositories;

namespace Portfolio.API.Extensions;

public static class DependencyInjection
{
    /// <summary>
    /// Automatically scans and registers open generic repositories, Unit of Work,
    /// and all application services matching convention (IFoo -> Foo) into the DI container.
    /// </summary>
    public static IServiceCollection AddAutoRegisteredServices(this IServiceCollection services, Assembly? assembly = null)
    {
        var targetAssembly = assembly ?? Assembly.GetExecutingAssembly();

        // 1. Auto-register Open-Generic Repository
        services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

        // 2. Scan assembly for concrete classes implementing matching I{ClassName} interfaces
        var classTypes = targetAssembly.GetTypes()
            .Where(t => t is { IsClass: true, IsAbstract: false, IsGenericTypeDefinition: false });

        foreach (var implementationType in classTypes)
        {
            var interfaces = implementationType.GetInterfaces();
            foreach (var serviceInterface in interfaces)
            {
                if (serviceInterface.Assembly == targetAssembly && serviceInterface.Name == $"I{implementationType.Name}")
                {
                    services.AddScoped(serviceInterface, implementationType);
                }
            }
        }

        return services;
    }
}
