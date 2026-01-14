import { X } from "lucide-react";

const SizeGuideModal = ({ isOpen, onClose, category }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white dark:bg-gray-900 w-full max-w-lg p-8 shadow-2xl transition-all duration-300">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-preque-carbon dark:hover:text-white">
                    <X size={24} />
                </button>
                <h3 className="text-2xl font-serif text-preque-carbon dark:text-preque-beige mb-6 text-center">Size Guide ({category})</h3>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-center text-preque-carbon dark:text-gray-300">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-800">
                                <th className="py-3 font-medium uppercase tracking-widest text-xs text-gray-500">Size</th>
                                <th className="py-3 font-medium uppercase tracking-widest text-xs text-gray-500">Chest (in)</th>
                                <th className="py-3 font-medium uppercase tracking-widest text-xs text-gray-500">Waist (in)</th>
                                <th className="py-3 font-medium uppercase tracking-widest text-xs text-gray-500">Length (in)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            <tr><td className="py-3">XS</td><td>32-34</td><td>26-28</td><td>27</td></tr>
                            <tr><td className="py-3">S</td><td>35-37</td><td>29-31</td><td>27.5</td></tr>
                            <tr><td className="py-3">M</td><td>38-40</td><td>32-34</td><td>28</td></tr>
                            <tr><td className="py-3">L</td><td>41-43</td><td>35-37</td><td>28.5</td></tr>
                            <tr><td className="py-3">XL</td><td>44-46</td><td>38-40</td><td>29</td></tr>
                        </tbody>
                    </table>
                </div>
                <p className="mt-6 text-xs text-gray-400 text-center uppercase tracking-wider">Measurements in inches</p>
            </div>
        </div>
    );
};

export default SizeGuideModal;
