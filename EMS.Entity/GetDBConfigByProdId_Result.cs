//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace EMS.Entity
{
    using System;
    
    public partial class GetDBConfigByProdId_Result
    {
        public int ProductionConfigId { get; set; }
        public Nullable<int> ProductionId { get; set; }
        public string DBName { get; set; }
        public string DBConnectionString { get; set; }
        public string DBLogin { get; set; }
        public string DBPassword { get; set; }
    }
}