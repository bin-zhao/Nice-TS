﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NiceTS
{
	public interface ISignal
	{
		Delegate listener
		{
			get;
			set;
		}

		void RemoveAllListeners();
	}
}