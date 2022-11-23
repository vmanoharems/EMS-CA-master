using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data.Entity.Core.EntityClient;
using System.Data.Entity;
using System.Configuration;

// Possible MAJOR bug with concurrent connections #3819
namespace EMS.Entity
{
    public static class ConnnectionString
    {
        static string _globalValue;
        public static string GlobalValue
        {
            get
            {
                return _globalValue;
            }
            set
            {
                _globalValue = value;
            }
        }

    }

   
   
}
