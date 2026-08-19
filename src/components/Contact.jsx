import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

const MotionDiv = motion.div;
const MotionAnchor = motion.a;

const contactEmail = 'paulovianadev@gmail.com';

const Contact = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      icon: <FaGithub />,
      url: 'https://github.com/PauloVianaTech',
      color: 'from-gray-700 to-gray-900',
      note: 'Veja meus repositórios',
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin />,
      url: 'https://www.linkedin.com/in/paulo-camilo-viana',
      color: 'from-sky-600 to-blue-800',
      note: 'Conecte-se comigo',
    },
    {
      name: 'Instagram',
      icon: <FaInstagram />,
      url: 'https://www.instagram.com/paulovianatech',
      color: 'from-pink-500 to-purple-700',
      note: 'Acompanhe meu trabalho',
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 pb-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-transparent" />
      <div className="absolute top-20 left-10 w-20 h-20 bg-cyan-500/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-500" />

      <div className="max-w-6xl mx-auto relative z-10">
        <MotionDiv
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold font-display mb-4">
            <span className="dark:bg-gradient-to-r dark:from-cyan-400 dark:via-emerald-400 dark:to-cyan-600 dark:bg-clip-text dark:text-transparent text-cyan-600">
              ENTRE EM
            </span>{' '}
            <span className="dark:text-white text-slate-800">CONTATO</span>
          </h2>
          <p className="text-xl dark:text-slate-400 text-slate-600 font-cascadia">
            Vamos conversar sobre projetos, automações e soluções digitais.
          </p>
        </MotionDiv>

        <div className="mx-auto max-w-xl">
          <MotionDiv
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-emerald-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 hidden dark:block" />
            <div className="relative dark:bg-slate-900/80 bg-white backdrop-blur-xl rounded-3xl p-8 border dark:border-slate-700/50 border-slate-100 shadow-lg dark:shadow-none">
              <h3 id="onde-me-encontrar" className="text-2xl font-bold dark:text-white text-slate-900 mb-6 text-center">
                Onde me encontrar
              </h3>

              <div className="grid gap-4">
                {socialLinks.map((social, index) => (
                  <MotionAnchor
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className={`group flex items-center gap-4 p-4 bg-gradient-to-r ${social.color} rounded-xl text-white transition-all duration-300 hover:shadow-xl`}
                  >
                    <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                      {social.icon}
                    </div>
                    <div className="flex-1">
                      <span className="font-semibold">{social.name}</span>
                      <p className="text-sm opacity-90">{social.note}</p>
                    </div>
                    <FaEnvelope className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </MotionAnchor>
                ))}

                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-100 p-3 text-slate-500 opacity-65 dark:border-white/10 dark:bg-slate-800/30 dark:text-white/60">
                  <FaYoutube className="text-xl" />
                  <div>
                    <span className="text-sm font-semibold">Em breve: YouTube</span>
                    <p className="text-xs opacity-75">Canal em preparação</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-2xl border dark:border-slate-700 border-slate-200 dark:bg-slate-800/40 bg-slate-50 p-5 text-center">
                <p className="text-sm dark:text-slate-400 text-slate-600">
                  Prefere contato direto?
                </p>
                <a
                  href={`mailto:${contactEmail}`}
                  className="mt-2 inline-block font-semibold text-cyan-600 dark:text-cyan-300 hover:underline"
                >
                  {contactEmail}
                </a>
              </div>
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
};

export default Contact;

